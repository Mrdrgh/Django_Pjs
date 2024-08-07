import Form from "../components/Form"
import Nav from "./navbar"
export default function Login() {
    return (<>
        <Nav name="register" link="/register"/>
        <Form route={"/api/token/"} method={"login"}/>
    </>)
};