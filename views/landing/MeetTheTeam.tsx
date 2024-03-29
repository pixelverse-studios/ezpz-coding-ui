import samisHeadshot from '../../../assets/sami-headshot.jpeg'
import philsHeadshot from '../../../assets/phil-headshot.jpg'
import kevinsHeadshot from '../../../assets/kevin-headshot.jpeg'
import styles from './Landing.module.scss'

const LoadingRibbon = () => (
    <div className={styles.ribbon}>
        <div className={styles.ribbonContent}>Loading</div>
    </div>
)

const MeetTheTeam = () => {
    return (
        <div className={styles.meetTheTeamBlock}>
            <h1>Meet the team</h1>
            <div className={styles.teamBlock}>
                <div className={styles.devCard}>
                    <div
                        className={styles.headshot}
                        style={{
                            backgroundImage: `url('${philsHeadshot.src}')`
                        }}
                    />
                    <h2>Phil Arfuso</h2>
                    <span className={styles.role}>Lead Developer</span>
                </div>
                <div className={styles.devCard}>
                    <LoadingRibbon />
                    <div
                        className={`${styles.headshot} ${styles.kevin}`}
                        style={{
                            backgroundImage: `url('${kevinsHeadshot.src}')`
                        }}
                    />
                    <h2>Kevin LaCarrubba</h2>
                    <span className={styles.role}>Developer</span>
                </div>
                <div className={styles.devCard}>
                    <LoadingRibbon />
                    <div
                        className={styles.headshot}
                        style={{
                            backgroundImage: `url('${samisHeadshot.src}')`
                        }}
                    />
                    <h2>Sami Fares</h2>
                    <span className={styles.role}>Developer</span>
                </div>
            </div>
        </div>
    )
}

export default MeetTheTeam
