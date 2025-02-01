const CircularProgress = ({ per }) => {
    const circumference = 2 * Math.PI * 50;
    const strokeDashoffset = circumference - per;
  
    return (
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="gray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="blue"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
        />
      </svg>
    );
  };
  