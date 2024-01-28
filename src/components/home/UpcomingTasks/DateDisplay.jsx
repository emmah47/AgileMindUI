function DateDisplay() {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
  };

  return (
    <div className="date-display">
      <div className="date-display-text">Today's Date</div>
      <div className="date-display-text-day">{new Date().toLocaleDateString(undefined, options)}</div>
    </div>
  );
}

export default DateDisplay