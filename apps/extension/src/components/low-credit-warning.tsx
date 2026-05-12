interface LowCreditWarningProps {
  balance: number
}

function LowCreditWarning({ balance }: LowCreditWarningProps) {
  if (balance >= 5) return null;

  return (
    <div
      style={{
        background: 'rgba(220,38,38,0.06)',
        borderLeft: '3px solid #DC2626',
        padding: '10px 12px',
        borderRadius: '0 4px 4px 0',
        marginBottom: '12px',
      }}
    >
      <span
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          color: '#DC2626',
          lineHeight: 1.4,
        }}
      >
        ⚡ Low credits &mdash;
        {' '}
        {balance}
        {' '}
        remaining.
        {' '}
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('Top Up clicked — placeholder action');
          }}
          style={{
            color: '#053B84',
            textDecoration: 'underline',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
          }}
        >
          Top Up &rarr;
        </button>
      </span>
    </div>
  );
}

export { LowCreditWarning };
