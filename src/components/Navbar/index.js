import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoggedOut } from "../../actions/authActions";
import "./style.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideLogoutButton: true
        };
    }

    toggleLogoutButton = () => {
        this.setState(prevState => ({
            hideLogoutButton: !prevState.hideLogoutButton
        }));
    };
    render() {
        const { firstName, lastName } = this.props.user.user;
        return (
            <React.Fragment>
                <div className="navbar">
                    <h1>{this.props.title}</h1>
                    <div
                        className="user-icon"
                        onClick={this.toggleLogoutButton}
                    >
                        <span className="first-name">
                            {firstName.substr(0, 1)}
                        </span>
                        <span className="last-name">
                            {lastName.substr(0, 1)}
                        </span>
                    </div>
                </div>
                {this.state.hideLogoutButton ? null : (
                    <div className="logout" onClick={this.props.setLoggedOut}>
                        Logout
                    </div>
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    user: state.auth
});
const mapDispatchToProps = dispatch => ({
    setLoggedOut: () => dispatch(setLoggedOut())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
