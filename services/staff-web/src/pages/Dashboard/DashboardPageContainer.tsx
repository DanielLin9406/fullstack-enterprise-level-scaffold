import { connect } from "react-redux";

import { DashboardPage } from "./DashboardPage";

const mapStateToProps = (state: any) => ({
  promotion: state.scheduledPrice.promotion,
  errMsg: [state.scheduledPrice.errMsg],
  loading: [state.scheduledPrice.isLoading],
});

export default connect(mapStateToProps, null)(DashboardPage);
