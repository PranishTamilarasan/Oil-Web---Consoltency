import React from 'react';

const TestPage = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>🎉 Test Page Works!</h1>
            <p>If you can see this page, the basic routing is working.</p>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => alert('JavaScript is working!')}>
                    Test JavaScript
                </button>
            </div>
            <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
                <h3>Environment Info:</h3>
                <p>Current URL: {window.location.href}</p>
                <p>User Agent: {navigator.userAgent}</p>
                <p>Time: {new Date().toLocaleString()}</p>
            </div>
        </div>
    );
};

export default TestPage;
