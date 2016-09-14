package org.deeg.utc

import org.scalatra._
import java.net.URL
import org.scalatra.scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import com.quinsoft.zeidon.standardoe.JavaObjectEngine
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.standardoe.IncrementalEntityFlags
import com.quinsoft.zeidon.scala.QualBuilder

class UtcScalatra extends ScalatraServlet
                           with ScalateSupport
                           with JacksonJsonSupport
                           with CorsSupport {

    protected implicit val jsonFormats: Formats = DefaultFormats
    val oe = JavaObjectEngine.getInstance()

    options("/*") {
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
    }

    error {
      case e: Throwable => {
        oe.getSystemTask.log().error(e)
        e.printStackTrace();
      }
    }

    // Before every action runs, set the content type to be in JSON format.
    before() {
        contentType = formats("json")
    }

    get("/:lod") {
        activate { task =>
            val order = View( task ) basedOn params( "lod" )
            val qual = order.buildQual().rootOnlyMultiple()

            qual.withPaging( params.getOrElse("perPage", "20").toInt,
                             params.getOrElse("page", "1").toInt,
                             params.getOrElse("getTotal", "false").toBoolean )

            order.lodName match {
                case "Product" => addProductParams( qual )
                case "Order"   => addOrderParams( qual )
                case _ =>
            }

            qual.readOnly.activate()
        }
    }

    get("/:lod/:id") {
        activate { task =>
            val lodName = params( "lod" )
            val order = View( task ) basedOn lodName
            order.buildQual( _.root.key = params("id" ) ).readOnly.activate()
        }
    }

    post("/:lod") {
        oe.forTask( "UTC" ) { task =>
            val view = task.deserializeOi()
                           .setLodDef( params( "lod") )
                           .setVersion("1")
                           .fromString( request.body )
                           .asJson()
                           .unpickle

            view.commit

            val serialized = view.serializeOi.asJson.toString()
            task.log().debug( serialized )
            serialized
        }
    }

    get("/echo/:string") {
        oe.forTask( "UTC" ) { task =>
            params("string" )
        }
    }
    
    private def activate( f: (Task) => View ) = {
        oe.forTask( "UTC" ) { task =>
            val view = f( task )
            if ( view.isEmpty )
                NotFound( "No data found" )
            else {
                val serialized = view.serializeOi.asJson.toString()
                task.log().debug( serialized )
                serialized
            }
        }
    }

    /**
     * Add some qualification for Product lod.
     */
    private def addProductParams( qual: QualBuilder ) = {
        val param = params.getOrElse("name", "" )
        if ( param != "" )
            qual.and( _.Product.ProductName like "%" + param + "%" )
    }

    /**
     * Add some qualification for Product lod.
     */
    private def addOrderParams( qual: QualBuilder ) = {
        val product = params.getOrElse("product", "" )
        if ( product != "" )
            qual.and( _.Product.ProductName like "%" + product + "%" )
    }
}
