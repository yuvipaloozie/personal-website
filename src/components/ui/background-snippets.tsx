export const BackgroundSnippets = () => {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(to right, #f9f9f9 1px, transparent 1px), linear-gradient(to bottom, #f9f9f9 1px, transparent 1px)',
        backgroundSize: '25px 25px',
        maskImage: 'linear-gradient(to bottom, black 40%, transparent 90%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 90%)',
        zIndex: 0
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle 800px at 100% 200px, rgba(130, 47, 122, 0.08), transparent),
            radial-gradient(circle 600px at 0% 80%, rgba(130, 47, 122, 0.06), transparent)
          `,
          zIndex: 1
        }}
      ></div>
    </div>
  );
};
