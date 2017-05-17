package org.deeg.utc.controller

import twitter4j.AsyncTwitter
import twitter4j.AsyncTwitterFactory
import twitter4j.MediaEntity
import twitter4j.ResponseList
import twitter4j.Status
import twitter4j.StatusUpdate
import twitter4j.TwitterAdapter
import twitter4j.TwitterException
import twitter4j.TwitterMethod
import twitter4j.conf.ConfigurationBuilder
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.Implicits._
import java.nio.file.{Paths, Files}
import com.quinsoft.zeidon.scala.basedOn

class TwitterFeed( session: View @basedOn( "Session" ) ) extends TwitterAdapter {
    private val task = session.task
    private val logger = task.log()
    private val twitterConfig = this.getTwitterConfig
    private val tweetPeriodMillis = twitterConfig.Twitter.TweetPeriodInMinutes.toInt * 1000 * 60
    private var nextTweetMillis : Long = 0
    private var tweetCount = 0

    /**
     * If true then we are currently tweeting.
     */
    private var tweeting : Boolean = session.Configuration.TweetOn
    logger.info("Loaded TwitterFeed with tweeting = %s", tweeting )

    //
    // Get session to twitter
    //
    lazy private val twitterSession: AsyncTwitter = {
        logger.info( "Getting session to twitter" )
        val cb = new ConfigurationBuilder()
        cb.setDebugEnabled( true )
          .setOAuthConsumerKey( twitterConfig.Twitter.ConsumerKey )
          .setOAuthConsumerSecret( twitterConfig.Twitter.ConsumerSecret )
          .setOAuthAccessToken( twitterConfig.Twitter.AccessToken )
          .setOAuthAccessTokenSecret( twitterConfig.Twitter.AccessTokenSecret )
        val tf = new AsyncTwitterFactory( cb.build() )
        val ts = tf.getInstance()
        ts.addListener( this )
        ts
    }

    def tweetSmokerStatus( instant : View @basedOn( "Instant" ) ): Unit = {
        if ( ! tweeting )
            return

        // If it's not time to tweet, skip it.
        if ( nextTweetMillis > System.currentTimeMillis() )
            return

        nextTweetMillis = System.currentTimeMillis() + tweetPeriodMillis

        // If we don't have any instants than nothing to tweet.
        if ( ! session.Instant.setLast )
            return

        val status = new StringBuilder
        if ( instant.Instant.Error )
            status ++= "*ERROR* "

        status ++= "Pit=" ++= session.Configuration.TargetTemperature
        var thermCount = -1
        session.ThermometerConfig.foreach( tc => {
            thermCount += 1
            val temperature = instant.Instant.getAttribute( s"Therm${thermCount}" ).getString( "###.#" )
            status ++= "  " ++= tc.Name ++= "=" ++= temperature
        } )

        status ++= "  Fan=" ++= session.Instant.PWM0
        tweetMessage( status.toString() )
    }

    private def tweetMessage( message: String ) = {
        tweetCount += 1

        // Make sure we don't go over Twitter's 140-char.
        val maxLth = 135
        var msg =
            if ( message.length() > maxLth )
                message.subSequence( 0, maxLth ).toString()
            else
                message

        // Add a counter so the status messages are different.  Without the counter
        // Twitter won't update the status if two messages are the same.
        msg ++= " :" + (tweetCount % 10 );
        logger.debug( "Tweeting message: %s", msg )

        // Send a message asynchronously.
        val status = new StatusUpdate( msg )
//        if ( chart != null )
//            status.setMedia( chart )
        twitterSession.updateStatus( status )
    }

    private def getTwitterConfig : View = {
        var twitterConfig = task.newView( "TwitterConfig" ).activateWhere( _.Twitter.Id = 1 )
        if ( ! twitterConfig.isEmpty )
            return twitterConfig

        val filename = "/home/root/twitter-cfg.por"
        if ( Files.exists(Paths.get( filename ) ) ) {
            logger.info( "Loading twitter config from twitter-cfg.por" )
            twitterConfig = task.deserializeOi.setLodDef( "TwitterConfig" ).fromFile( filename ).activateFirst()
        }
        else {
            logger.info( "Creating twitter config from scratch" )
            twitterConfig.activateEmpty()
            twitterConfig.Twitter create()
            twitterConfig.Twitter.Username = "TwitterHandle"
            twitterConfig.Twitter.TweetPeriodInMinutes = 5
        }

        twitterConfig.logOi
        twitterConfig commit()
        return twitterConfig
    }

    override def updatedStatus( status: Status ) = {
        logger.debug( "Successfully updated the status to [" + status.getText() + "]." )
    }

    /* (non-Javadoc)
     * @see twitter4j.TwitterAdapter#onException(twitter4j.TwitterException, twitter4j.TwitterMethod)
     */
    override def onException( e: TwitterException, method: TwitterMethod ) = {
        logger.error( "Error using Twitter" )
        logger.error( e )
        logger.error( "Method = " + method.toString() )
        e.printStackTrace()
    }

    /*
     * This gets called with the most recent statuses.  Make sure everything looks OK.
     */
    override def gotUserTimeline( statuses : ResponseList[Status] ) = {
        logger.info( "Got timeline" )
    }
}
