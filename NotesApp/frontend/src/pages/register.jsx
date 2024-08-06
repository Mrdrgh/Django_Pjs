import Form from "../components/Form"
export default function Register() {
    console.log("rendering Register ...");
    return (<Form route={"/api/user/register/"} method={"register"}/>)
};
