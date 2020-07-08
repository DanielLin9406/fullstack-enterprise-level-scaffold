import { connect, ConnectedProps } from "react-redux";
import { Login } from "./LoginPage";

const mapStateToProps = ({ staff }: { staff: any }) => ({
  staff,
});

export default connect(mapStateToProps, null)(Login);
