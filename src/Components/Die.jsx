export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <div onClick={props.diceHold} className="button" style={styles}>
            <h2>{props.value}</h2>
        </div>
    )
}
