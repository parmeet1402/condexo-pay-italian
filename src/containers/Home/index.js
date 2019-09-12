import React, { Component } from "react";
import CreateNewCompany from "../../components/CreateNewCompany";
import CreateNewPerson from "../../components/CreateNewPerson";
import Companies from "../../components/Companies";
import Navbar from "../../components/Navbar";
import "./style.css";

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar title="companies" />
                <div className="home">
                    <h1>Companies</h1>
                    <div className="content">
                        <div className="companies-container">
                            <Companies />
                        </div>
                        <div className="sidebar">
                            <CreateNewCompany />
                            <CreateNewPerson />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
