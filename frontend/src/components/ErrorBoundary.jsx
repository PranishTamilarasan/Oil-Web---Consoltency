import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('🚨 ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    background: '#fef2f2',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '40px',
                        borderRadius: '12px',
                        border: '1px solid #fecaca',
                        maxWidth: '600px',
                        width: '90%'
                    }}>
                        <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>
                            🚨 Application Error
                        </h2>
                        <p style={{ color: '#7f1d1d', marginBottom: '24px' }}>
                            Something went wrong and the application couldn't render properly.
                        </p>
                        
                        <details style={{ 
                            background: '#f8f9fa', 
                            padding: '16px', 
                            borderRadius: '8px', 
                            marginBottom: '24px',
                            textAlign: 'left'
                        }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>
                                Error Details
                            </summary>
                            <pre style={{ 
                                fontSize: '12px', 
                                overflow: 'auto', 
                                maxHeight: '200px',
                                background: '#fff',
                                padding: '12px',
                                borderRadius: '4px',
                                border: '1px solid #e5e7eb'
                            }}>
                                {this.state.error && this.state.error.toString()}
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button 
                                onClick={() => window.location.reload()} 
                                style={{
                                    background: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Reload Page
                            </button>
                            <button 
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = '/login';
                                }} 
                                style={{
                                    background: '#6b7280',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Clear & Login
                            </button>
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
                            <p>💡 Try these steps:</p>
                            <ol style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                <li>Reload the page</li>
                                <li>Clear browser cache and localStorage</li>
                                <li>Check browser console for more errors</li>
                                <li>Try logging in again</li>
                            </ol>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
