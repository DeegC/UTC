import org.scalatra.LifeCycle
import javax.servlet.ServletContext
import org.deeg.utc._

class ScalatraBootstrap extends LifeCycle {

  override def init(context: ServletContext) {

    context mount (new UtcScalatra, "/utc/*")
  }
}
