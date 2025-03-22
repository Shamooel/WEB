import "../../styles/LoadingScreen.css"

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2 className="loading-message">{message}</h2>
      </div>
    </div>
  )
}

export default LoadingScreen

