function WeatherBoard(props){
    return (
        <div>
            <h1>Today it is {props.current.condition.text} in {props.location.name}</h1>
            <h2>{props.current.temp_f}</h2>
        </div>
    )
}

export default WeatherBoard;