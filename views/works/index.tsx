import Link from 'next/link'

import { CLIENT_PAGES } from './utils'
import { WorkCard } from '../../components/elements/card'
import styles from './Works.module.scss'

const WorksPage = () => {
    return (
        <section className={styles.WorksPageContent}>
            <div className="contentSize">
                <div className={styles.worksHero}>
                    <h1>Our Standout Works</h1>
                    <p>
                        No matter the size of the project, we always deliver top
                        tier results. <Link href="/contact">Contact us </Link>{' '}
                        now to get started.
                    </p>
                </div>
                <ul className={styles.projectsDisplay}>
                    {CLIENT_PAGES?.length
                        ? CLIENT_PAGES.map(
                              (client: {
                                  company: string
                                  url: string
                                  img: string
                                  description: string
                              }) => (
                                  <WorkCard
                                      key={client.company}
                                      media={client.img}
                                      title={client.company}
                                      url={client.url}
                                      description={client.description}
                                  />
                              )
                          )
                        : null}
                    {/* <WorkCard
                        media={UnderConstructionImg.src}
                        title="More on the way"
                        url=""
                        description="Always working on something new behind the scene"
                    /> */}
                </ul>
            </div>
        </section>
    )
}

export default WorksPage
