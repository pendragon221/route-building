import React from "react";

const LoadingAnimation = (props) => {
    return (
        <div id={props.isLoading ? "loading_true" : "loading_false"}>
            <img src="https://www.pinclipart.com/picdir/big/235-2355092_waiting-circle-clipart.png"
                width="30px"
                height="30px"
                alt=""
            />
        </div>
    )
}

export default LoadingAnimation