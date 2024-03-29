import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { More } from '@mui/icons-material'

import { GET_ALL_USERS, GET_DEV_HOURS } from '../../lib/gql/queries/user'
import { FETCH_ALL_CLIENTS } from '../../lib/gql/queries/clients'
import {
    setLoadingAllClients,
    setClients
} from '../../lib/redux/slices/allClients'
import { setLoadingAllUsers, setUsers } from '../../lib/redux/slices/allUsers'

import {
    setDevelopers,
    setLoadingDevHours
} from '../../lib/redux/slices/developerHours'
import {
    showBanner,
    showTechnicalDifficultiesBanner
} from '../../lib/redux/slices/banner'
import UsersOverview from './components/users/overview'
import ProjectOverview from './components/projects/overview'
import ClientsOverview from './components/clients/overview'
import {
    DeveloperHoursLineChart,
    DeveloperHoursPieChart
} from '../../components/charts'
import Loader from '../../components/loader/triangle'
import styles from './Dashboard.module.scss'
import { Card } from '../../components/elements'

const DashboardWrapper = ({ children }: { children: any }) => (
    <section className={styles.Dashboard}>{children}</section>
)

const Dashboard = () => {
    const dispatch = useDispatch()
    const { loadingAllUsers } = useSelector((state: any) => state.allUsers)
    const { loadingAllClients } = useSelector((state: any) => state.allClients)
    const { loadingDevHours } = useSelector(
        (state: any) => state.developerHours
    )

    const [getAllUsers] = useLazyQuery(GET_ALL_USERS, {
        onCompleted({ getAllUsers: data }) {
            if (data.__typename === 'Errors') {
                dispatch(
                    showBanner({
                        message: data.message,
                        type: data.__typename
                    })
                )
            } else {
                dispatch(setUsers(data.users))
            }

            dispatch(setLoadingAllUsers(false))
        },
        onError() {
            dispatch(setLoadingAllUsers(false))
            dispatch(showTechnicalDifficultiesBanner())
        }
    })

    const [getAllClients] = useLazyQuery(FETCH_ALL_CLIENTS, {
        onCompleted({ getAllClients: data }) {
            if (data.__typename === 'Errors') {
                dispatch(
                    showBanner({
                        message: data.message,
                        type: data.__typename
                    })
                )
            } else {
                dispatch(setClients(data.clients))
            }
            dispatch(setLoadingAllClients(false))
        },
        onError() {
            dispatch(setLoadingAllClients(false))
            dispatch(showTechnicalDifficultiesBanner())
        }
    })

    const [getDeveloperHours] = useLazyQuery(GET_DEV_HOURS, {
        onCompleted({ getDeveloperHours: data }) {
            if (data.__typename === 'Errors') {
                dispatch(
                    showBanner({
                        message: data.message,
                        type: data.__typename
                    })
                )
            } else {
                dispatch(setDevelopers(data))
            }
            dispatch(setLoadingDevHours(false))
        },
        onError() {
            dispatch(setLoadingDevHours(false))
            dispatch(showTechnicalDifficultiesBanner())
        }
    })

    useEffect(() => {
        dispatch(setLoadingAllUsers(true))
        dispatch(setLoadingAllClients(true))
        dispatch(setLoadingDevHours(true))
        getAllUsers()
        getAllClients()
        getDeveloperHours()
    }, [])

    if (loadingAllUsers || loadingAllClients || loadingDevHours) {
        return (
            <DashboardWrapper>
                <Loader />
            </DashboardWrapper>
        )
    }

    return (
        <DashboardWrapper>
            <div className={styles.dashboardMain}>
                <div className={styles.top}>
                    <div className={styles.personnelOverview}>
                        <ProjectOverview />
                        <UsersOverview />
                    </div>
                    <Card style="dark">
                        <DeveloperHoursPieChart />
                    </Card>
                </div>
                <Card style="dark">
                    <DeveloperHoursLineChart />
                </Card>
            </div>
            <div className={styles.clientsOverview}>
                <div>
                    <h1>Clients</h1>
                    <Link href="/dashboard/clients">
                        <More />
                    </Link>
                </div>
                <ClientsOverview />
            </div>
        </DashboardWrapper>
    )
}

export default Dashboard
