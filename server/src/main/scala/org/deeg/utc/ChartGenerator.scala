package org.deeg.utc

import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.Implicits._
import scalax.chart.api._
import com.quinsoft.zeidon.standardoe.JavaObjectEngine
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.AttributeInstance
import org.jfree.data.time.Second
import java.time.ZonedDateTime
import java.util.Date
import scala.collection.mutable.ArrayBuffer

class ChartGenerator( val session: View @basedOn( "Session" ) ) {
    def generate() : String = {
        val thermCount = session.ThermometerConfig.count

        // Create a collection of empty series.  We'll populate them later.
        val allData = new TimeSeriesCollection( )
        allData.addSeries( new TimeSeries( "target" ) )
        session.ThermometerConfig.foreach{ therm =>
            allData.addSeries( new TimeSeries( therm.Name.getString() ) )
        }

        session.Instant.foreach { inst =>
            val seconds = toSeconds( inst.Timestamp )
            allData.getSeries(0).add( seconds, inst.TargetTemperature.toInt )
            for ( t <- 1 to thermCount )
                allData.getSeries(t).add( seconds, inst.getAttribute( "Therm" + (t-1) ).toInt )
        }

        val chart = XYLineChart( allData )
        val filename = s"${UtcScalatra.TEMP_DIR}/charts/session-${session.Session.Id}.png"
        chart.saveAsPNG( filename )
        return filename
    }

    private def toSeconds( timestamp: AttributeInstance ) : Second = {
        val date = Date.from(timestamp.value.asInstanceOf[ZonedDateTime].toInstant());
        new Second( date )
    }
}

object ChartGenerator {
    def main(args: Array[String]) {
        val oe = JavaObjectEngine.getInstance()
        oe.forTask( "UTC" ) { task =>
            val session = new View( task ) basedOn "Session"
            session.activateWhere( _.Session.Id = 21 )
            session.logOi

            val generator = new ChartGenerator( session )
            generator.generate()
        }
    }
}
