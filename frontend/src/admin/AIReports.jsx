import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Calendar, Download, RefreshCw, FileText, BarChart, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AIReports = () => {
    const { user, authorizedFetch } = useAuth();
    const [summary, setSummary] = useState('');
    const [detailedReport, setDetailedReport] = useState('');
    const [insights, setInsights] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reportType, setReportType] = useState('comprehensive');
    const [timeRange, setTimeRange] = useState('monthly');
    const [selectedMetric, setSelectedMetric] = useState('general');

    const token = user?.token;

    // Check if user is admin
    if (!user || user.role !== 'ADMIN') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: '#F9FBF9' }}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <AlertCircle size={48} style={{ color: '#EF4444', margin: '0 auto 16px' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444', marginBottom: '8px' }}>Access Denied</h2>
                    <p style={{ color: '#666' }}>Admin access required to view AI Reports</p>
                </div>
            </div>
        );
    }

    // Generate AI Summary
    const generateSummary = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await authorizedFetch('http://localhost:5000/api/admin/ai/summary', {
                method: 'POST'
            });

            console.log('🤖 AI Summary response:', response);

            if (response.success) {
                setSummary(response.data.summary);
                console.log('✅ AI Summary generated');
            } else {
                setError(response.message || 'Failed to generate summary');
                console.log('❌ AI Summary failed:', response.message);
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('🚨 AI Summary error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Generate Detailed Report
    const generateDetailedReport = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await authorizedFetch(`http://localhost:5000/api/admin/ai/detailed?reportType=${reportType}&timeRange=${timeRange}`, {
                method: 'POST'
            });

            console.log('🤖 AI Detailed Report response:', response);

            if (response.success) {
                setDetailedReport(response.data.report);
                console.log('✅ AI Detailed Report generated');
            } else {
                setError(response.message || 'Failed to generate report');
                console.log('❌ AI Detailed Report failed:', response.message);
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('🚨 AI Detailed Report error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get AI Insights
    const getInsights = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await authorizedFetch(`http://localhost:5000/api/admin/ai/insights?metric=${selectedMetric}`);

            console.log('🤖 AI Insights response:', response);

            if (response.success) {
                setInsights(response.data.insights);
                console.log('✅ AI Insights generated');
            } else {
                setError(response.message || 'Failed to generate insights');
                console.log('❌ AI Insights failed:', response.message);
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('🚨 AI Insights error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Download as PDF (using browser print functionality)
    const downloadPDF = (content, filename) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${filename}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                        h1, h2, h3 { color: #333; }
                        pre { background: #f5f5f5; padding: 10px; border-radius: 4px; white-space: pre-wrap; }
                    </style>
                </head>
                <body>
                    <h1>${filename}</h1>
                    <pre>${content}</pre>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    // Format markdown content for display
    const formatMarkdown = (text) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return <h2 key={index} style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '20px 0 10px' }}>{line.substring(2)}</h2>;
            } else if (line.startsWith('## ')) {
                return <h3 key={index} style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '15px 0 8px' }}>{line.substring(3)}</h3>;
            } else if (line.startsWith('### ')) {
                return <h4 key={index} style={{ fontSize: '1rem', fontWeight: 'bold', margin: '10px 0 6px' }}>{line.substring(4)}</h4>;
            } else if (line.startsWith('- ')) {
                return <li key={index} style={{ marginLeft: '20px', marginBottom: '4px' }}>{line.substring(2)}</li>;
            } else if (line.match(/^\d+\. /)) {
                return <li key={index} style={{ marginLeft: '20px', marginBottom: '4px', listStyleType: 'decimal' }}>{line.substring(line.indexOf(' ') + 1)}</li>;
            } else if (line.trim() === '') {
                return <br key={index} />;
            } else {
                return <p key={index} style={{ marginBottom: '8px' }}>{line}</p>;
            }
        });
    };

    return (
        <div style={{ padding: '20px', background: '#F9FBF9', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Brain size={32} style={{ color: 'var(--primary)' }} />
                        <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>AI Reports & Insights</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={generateSummary}
                            disabled={loading}
                            style={{
                                background: loading ? '#9CA3AF' : 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {loading ? <RefreshCw size={16} className="animate-spin" /> : <TrendingUp size={16} />}
                            Generate Summary
                        </button>
                    </div>
                </div>

                {error && (
                    <div style={{
                        background: '#FEE2E2',
                        color: '#B91C1C',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Executive Summary */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Executive Summary</h2>
                            {summary && (
                                <button
                                    onClick={() => downloadPDF(summary, 'Executive Summary')}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <Download size={14} />
                                    PDF
                                </button>
                            )}
                        </div>
                        {summary ? (
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {formatMarkdown(summary)}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                                <FileText size={48} style={{ color: '#9CA3AF', margin: '0 auto 16px' }} />
                                <p>Click "Generate Summary" to get AI-powered executive summary</p>
                            </div>
                        )}
                    </div>

                    {/* Detailed Report Controls */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>Detailed Report</h2>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                Report Type
                            </label>
                            <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <option value="comprehensive">Comprehensive</option>
                                <option value="performance">Performance</option>
                                <option value="operational">Operational</option>
                                <option value="financial">Financial</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>
                                Time Range
                            </label>
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                            </select>
                        </div>

                        <button
                            onClick={generateDetailedReport}
                            disabled={loading}
                            style={{
                                width: '100%',
                                background: loading ? '#9CA3AF' : 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginBottom: '16px'
                            }}
                        >
                            {loading ? <RefreshCw size={16} className="animate-spin" /> : <BarChart size={16} />}
                            Generate Report
                        </button>

                        {detailedReport && (
                            <button
                                onClick={() => downloadPDF(detailedReport, `${reportType} ${timeRange} Report`)}
                                style={{
                                    width: '100%',
                                    background: 'var(--accent)',
                                    color: '#000',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Download size={16} />
                                Download PDF
                            </button>
                        )}
                    </div>
                </div>

                {/* Detailed Report Content */}
                {detailedReport && (
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: '20px' }}>
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {formatMarkdown(detailedReport)}
                        </div>
                    </div>
                )}

                {/* AI Insights Section */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: '20px' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px' }}>AI Insights</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                        <button
                            onClick={() => { setSelectedMetric('users'); getInsights(); }}
                            style={{
                                background: selectedMetric === 'users' ? 'var(--primary)' : '#F3F4F6',
                                color: selectedMetric === 'users' ? 'white' : '#374151',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Users size={16} />
                            Users
                        </button>
                        <button
                            onClick={() => { setSelectedMetric('bookings'); getInsights(); }}
                            style={{
                                background: selectedMetric === 'bookings' ? 'var(--primary)' : '#F3F4F6',
                                color: selectedMetric === 'bookings' ? 'white' : '#374151',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Calendar size={16} />
                            Bookings
                        </button>
                        <button
                            onClick={() => { setSelectedMetric('revenue'); getInsights(); }}
                            style={{
                                background: selectedMetric === 'revenue' ? 'var(--primary)' : '#F3F4F6',
                                color: selectedMetric === 'revenue' ? 'white' : '#374151',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <TrendingUp size={16} />
                            Revenue
                        </button>
                        <button
                            onClick={() => { setSelectedMetric('general'); getInsights(); }}
                            style={{
                                background: selectedMetric === 'general' ? 'var(--primary)' : '#F3F4F6',
                                color: selectedMetric === 'general' ? 'white' : '#374151',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Brain size={16} />
                            General
                        </button>
                    </div>

                    {insights ? (
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {formatMarkdown(insights)}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                            <Brain size={48} style={{ color: '#9CA3AF', margin: '0 auto 16px' }} />
                            <p>Select a metric above to get AI-powered insights</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default AIReports;
