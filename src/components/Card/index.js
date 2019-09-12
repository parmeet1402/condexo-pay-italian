import React from "react";
import { Card as MaterialCard, CardContent } from "@material-ui/core";
import "./style.css";
const Card = props => {
    return (
        <MaterialCard className="card">
            <CardContent>
                <h1
                    className="card-title"
                    style={{
                        textTransform:
                            props.type === "employee"
                                ? "capitalize"
                                : "uppercase"
                    }}
                >
                    {props.title}
                </h1>
                {props.children}
            </CardContent>
        </MaterialCard>
    );
};

export default Card;
