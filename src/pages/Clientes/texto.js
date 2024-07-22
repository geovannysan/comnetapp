const TextoView = (props) => {
    let { keys, params } = props
    //console.log(typeof params == "string",keys)
    if (typeof params == "string")
        return (
            <div className="col-12 col-md-6 col-sm-4" >
                <h4>{keys}:</h4>
                <input className="d-none form-control" value={params}></input>
                <span className="">{params}</span>
                <hr></hr>
            </div>
        )
    ""
}
export default TextoView