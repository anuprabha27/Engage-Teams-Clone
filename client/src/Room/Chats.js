import './CallPage.css'

const Chats = ({
    messages,
    userID,
    otherUsername,
}) => {
    return (
        <div className = "messages">
            {messages.map(({sender,msg},index) => {
                if(sender===userID){
                    if(index-1>=0&&messages[index-1].sender===messages[index].sender){
                        return(
                            <div className = "my-msg" key={index}>
                                <p>{msg}</p>
                            </div>
                        )
                    }else{
                        return(
                        <div className = "my-msg" key={index}>
                            <strong>You</strong>
                            <p>{msg}</p>
                        </div>
                        )
                    }
                }else{
                    if(index-1>=0&&messages[index-1].sender===messages[index].sender){
                        return (
                            <div className = "their-msg" key={index}>
                                <p>{msg}</p>
                            </div>
                        )
                    }else{
                        return(
                            <div className = "their-msg" key={index}>
                                <strong>{otherUsername}</strong>
                                <p>{msg}</p>
                            </div>
                        )
                    }
                }
            })}
        </div> 
    )
}

export default Chats;