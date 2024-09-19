import AppNav from "../components/AppNav"
import Sidebar from "../components/sidebar"
import Map from "../components/Map"
import styles from './AppLayOut.module.css'

function AppLayOut() {
    return (
        <div className={styles.app} >
          <Sidebar/>
          <Map />
        </div>
    )
}

export default AppLayOut
