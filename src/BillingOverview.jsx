// src/pages/Billing/BillingOverview.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    DollarSign, 
    FileText, 
    Download, 
    Filter,
    Calendar,
    CreditCard,
    File
} from 'lucide-react';
import styles from './styles/BillingOverview.module.css';
import { billingService } from './services/billingService';
import Header from './Header';
import Footer from './Footer';

const BillingOverview = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('invoices');
    const [filterDate, setFilterDate] = useState('all');
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);
    const [summaryStats, setSummaryStats] = useState({
        totalRevenue: 0,
        pendingPayments: 0,
        overdueBills: 0,
        recentPayments: 0
    });

    useEffect(() => {
        fetchBillingData();
    }, [activeTab, filterDate]);

    const fetchBillingData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch summary statistics
            const statsResponse = await billingService.getBillingStats();
            setSummaryStats(statsResponse.data);

            // Fetch invoices or payments based on active tab
            if (activeTab === 'invoices') {
                const invoicesResponse = await billingService.getAllInvoices({
                    dateFilter: filterDate
                });
                setInvoices(invoicesResponse.data);
            } else {
                const paymentsResponse = await billingService.getAllPayments({
                    dateFilter: filterDate
                });
                setPayments(paymentsResponse.data);
            }
        } catch (err) {
            setError(err.message || 'Error fetching billing data');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (invoiceId) => {
        try {
            navigate(`/billing/process-payment/${invoiceId}`);
        } catch (err) {
            setError('Error initiating payment');
        }
    };

    const handleDownloadInvoice = async (invoiceId) => {
        try {
            await billingService.downloadInvoice(invoiceId);
        } catch (err) {
            setError('Error downloading invoice');
        }
    };

    const renderSummaryCards = () => (
        <><Header/>
        <div className={styles.summaryCards}>
            <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>
                    <DollarSign size={24} />
                </div>
                <div className={styles.summaryInfo}>
                    <h3>Total Revenue</h3>
                    <p>${summaryStats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>
                    <FileText size={24} />
                </div>
                <div className={styles.summaryInfo}>
                    <h3>Pending Payments</h3>
                    <p>${summaryStats.pendingPayments.toFixed(2)}</p>
                </div>
            </div>

            <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>
                    <Calendar size={24} />
                </div>
                <div className={styles.summaryInfo}>
                    <h3>Overdue Bills</h3>
                    <p>${summaryStats.overdueBills.toFixed(2)}</p>
                </div>
            </div>

            <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>
                    <CreditCard size={24} />
                </div>
                <div className={styles.summaryInfo}>
                    <h3>Recent Payments</h3>
                    <p>${summaryStats.recentPayments.toFixed(2)}</p>
                </div>
            </div>
        </div>
        <Footer/></>
    );

    const renderInvoices = () => (
        <><Header/>
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.invoiceId}>
                            <td>{invoice.invoiceId}</td>
                            <td>{`${invoice.patientName}`}</td>
                            <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                            <td>${invoice.total.toFixed(2)}</td>
                            <td>
                                <span className={`${styles.status} ${styles[invoice.status]}`}>
                                    {invoice.status}
                                </span>
                            </td>
                            <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button 
                                        className={styles.actionButton}
                                        onClick={() => handlePayment(invoice.invoiceId)}
                                    >
                                        <CreditCard size={16} />
                                        Pay
                                    </button>
                                    <button 
                                        className={styles.actionButton}
                                        onClick={() => handleDownloadInvoice(invoice.invoiceId)}
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer/></>
    );

    const renderPayments = () => (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Invoice ID</th>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.paymentId}>
                            <td>{payment.paymentId}</td>
                            <td>{payment.invoiceId}</td>
                            <td>{payment.patientName}</td>
                            <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            <td>${payment.amount.toFixed(2)}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>
                                <span className={`${styles.status} ${styles[payment.status]}`}>
                                    {payment.status}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className={styles.actionButton}
                                    onClick={() => handleDownloadReceipt(payment.paymentId)}
                                >
                                    <File size={16} />
                                    Receipt
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <><Header/>
        <div className={styles.container}>
            <div className={styles.header}>
                <button 
                    className={styles.backButton}
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>
                <h1>Billing Overview</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {renderSummaryCards()}

            <div className={styles.controls}>
                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tab} ${activeTab === 'invoices' ? styles.active : ''}`}
                        onClick={() => setActiveTab('invoices')}
                    >
                        Invoices
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'payments' ? styles.active : ''}`}
                        onClick={() => setActiveTab('payments')}
                    >
                        Payments
                    </button>
                </div>

                <div className={styles.filters}>
                    <select 
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading billing data...</div>
            ) : (
                activeTab === 'invoices' ? renderInvoices() : renderPayments()
            )}
        </div>
        <Footer/></>
    );
};

export default BillingOverview;