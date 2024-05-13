import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Users from './pages/Users/Users'
import ECommerce from './pages/Dashboard/ECommerce';

const routes = [

    {
        path: '/', element:
            <>
                <PageTitle title="Admin CMS" />
                <ECommerce />
            </>
    },
    {
        path: "/users", element:
            <>
                <PageTitle title="CMS | Users" />
                <Users />
            </>

    },
    {
        path: "/auth/signin", element:
            <>
                <PageTitle title="signin" />
                <SignIn />
            </>

    },
    {
        path: "/auth/signup", element:
            <>
                <PageTitle title="signup" />
                <SignUp />
            </>

    },
]

export default routes