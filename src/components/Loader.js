import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
    return (
        <div
            style={{
                margin: 'auto'
            }}
        >
            <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/temp/lf20_nOSgK9.json"
                style={{ height: "300px", width: "300px" }}
            ></Player>
        </div>
    );
};

export default Loader
