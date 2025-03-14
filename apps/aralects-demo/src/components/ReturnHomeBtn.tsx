import BackArrow from "../assets/images/back-arrow.png";

export const ReturnHomeBtn = () => {
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4321/demo';
  const isFromWebsite = new URLSearchParams(window.location.search).get('from') === 'website';

  if (!isFromWebsite) return null;

  const handleReturn = () => {
    window.location.href = websiteUrl;
  };

  return (
    <img 
      className="back-arrow" 
      src={BackArrow} 
      alt="back-arrow" 
      onClick={handleReturn}
      style={{
        position: 'absolute',
        left: 0,
        cursor: 'pointer'
      }}
    />
  );
}; 