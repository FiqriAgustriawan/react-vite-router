import './Header.css'

const Header = ({ title, showBack = false, onBack }) => {
  return (
    <header className="header">
      <div className="header-content">
        {showBack && (
          <button className="back-btn" onClick={onBack} aria-label="Go back">
            ←
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
    </header>
  )
}

export default Header