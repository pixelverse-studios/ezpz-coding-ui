import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { GET_ALL_USERS } from '../../../lib/gql/queries/user'
import { FETCH_ALL_CLIENTS } from '../../../lib/gql/queries/clients'
import {
    setLoadingAllProjects,
    setProjects
} from '../../../lib/redux/slices/allProjects'
import {
    setLoadingAllUsers,
    setUsers
} from '../../../lib/redux/slices/allUsers'
import {
    showBanner,
    showTechnicalDifficultiesBanner
} from '../../../lib/redux/slices/banner'
import UsersOverview from './components/usersOverview'
import ProjectOverview from './components/projectsOverview'
import Loader from '../../loader/triangle'
import styles from './Dashboard.module.scss'

const DashboardWrapper = ({ children }: { children: any }) => (
    <section className={styles.Dashboard}>
        <h1>Clients</h1>
        {children}
    </section>
)

const Dashboard = () => {
    const dispatch = useDispatch()
    const { loadingAllUsers } = useSelector((state: any) => state.allUsers)
    const { loadingAllProjects } = useSelector(
        (state: any) => state.allProjects
    )

    const [getAllUsers] = useLazyQuery(GET_ALL_USERS, {
        onCompleted({ getAllUsers: data }) {
            console.log('get all users', data)
            if (data.__typename === 'Errors') {
                dispatch(
                    showBanner({
                        message: data.message,
                        type: data.__typename
                    })
                )
            } else {
                dispatch(setUsers(data))
            }

            dispatch(setLoadingAllUsers(false))
        },
        onError() {
            dispatch(setLoadingAllUsers(false))
            dispatch(showTechnicalDifficultiesBanner())
        }
    })

    const [getAllProjects] = useLazyQuery(FETCH_ALL_CLIENTS, {
        onCompleted({ getAllClients: data }) {
            console.log('get all projects', data)
            if (data.__typename === 'Errors') {
                dispatch(
                    showBanner({
                        message: data.message,
                        type: data.__typename
                    })
                )
            } else {
                dispatch(setProjects(data))
            }
            dispatch(setLoadingAllProjects(false))
        },
        onError() {
            dispatch(setLoadingAllProjects(false))
            dispatch(showTechnicalDifficultiesBanner())
        }
    })

    useEffect(() => {
        dispatch(setLoadingAllUsers(true))
        getAllUsers()
    }, [])

    useEffect(() => {
        dispatch(setLoadingAllProjects(true))
        getAllProjects()
    }, [])

    if (loadingAllUsers) {
        return (
            <DashboardWrapper>
                <Loader />
            </DashboardWrapper>
        )
    }
    if (loadingAllProjects) {
        return (
            <DashboardWrapper>
                <Loader />
            </DashboardWrapper>
        )
    }

    return (
        <DashboardWrapper>
            <div className={styles.personnelOverview}>
                <ProjectOverview />
                <UsersOverview />
            </div>
            <div className={styles.productivityCharts}>
                <div>DEVELOPERS HOURS LINE CHART</div>
                <div>DEVELOPERS TOTAL HOURS PIE CHART</div>
            </div>
            <div className={styles.clientsDisplayGrid}>
                <div>CLIENT 1</div>
                <div>CLIENT 2</div>
                <div>CLIENT 3</div>
                <div>CLIENT 4</div>
            </div>
        </DashboardWrapper>
    )
}

export default Dashboard