package org.deeg.utc

import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn
import scalax.chart.api._
import com.quinsoft.zeidon.standardoe.JavaObjectEngine
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.AttributeInstance
import org.jfree.data.time.Second
import org.joda.time.DateTime

class ChartGenerator( val session: View @basedOn( "Session" ) ) {
    def generate() : String = {
        val targetData = new TimeSeries( "target" )
        val pitData = new TimeSeries( "pit" )
        val therm1Data = new TimeSeries( "therm1" )
        
        session.Instant.foreach { inst =>
            val seconds = toSeconds( inst.Timestamp )
            
            targetData.add( seconds, inst.Therm0.toInt ) 
            pitData.add( seconds, inst.Therm0.toInt ) 
            therm1Data.add( seconds, inst.Therm1.toInt ) 
        }
        
        val allData = new TimeSeriesCollection( pitData )
        allData.addSeries( targetData )
        allData.addSeries( therm1Data )
        
        val chart = XYLineChart( allData )
        val filename = s"charts/session-${session.Session.Id}.png"
        chart.saveAsPNG( filename )
        return filename
    }
    
    private def toSeconds( timestamp: AttributeInstance ) : Second = {
        new Second( timestamp.value.asInstanceOf[DateTime].toDate() )
    }
}

object ChartGenerator {
    def main(args: Array[String]) {
        val oe = JavaObjectEngine.getInstance()
        oe.forTask( "UTC" ) { task =>
            val session = new View( task ) basedOn "Session"
            session.activateWhere( _.Session.Id = 4 )
            session.logOi
            
            val generator = new ChartGenerator( session )
            generator.generate()
        }
    }    
}