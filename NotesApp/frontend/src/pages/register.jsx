import Form from "../components/Form"
import Nav from "./navbar";
export default function Register() {
    console.log("rendering Register ...");
    return (<>
        <Nav name="login" link="/login" />
        <Form route={"/api/user/register/"} method={"register"}/>
    </>);
};
