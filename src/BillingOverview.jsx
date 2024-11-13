// src/pages/Billing/BillingOverview.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, FileText, Download, Filter } from 'lucide-react';
import styles from './styles/BillingOverview.module.css';
import Header from './Header';
import Footer from './Footer';

const BillingOverview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('invoices');
  const [dateFilter, setDateFilter] = useState('all');

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      patient: 'Vikranth Singh',
      date: '2024-11-01',
      amount: 550.00,
      status: 'Paid',
      service: 'General Checkup'
    },
    {
      id: 'INV-2024-002',
      patient: 'Ajay Gosh',
      date: '2024-11-03',
      amount: 750.00,
      status: 'Pending',
      service: 'Specialist Consultation'
    },
    {
      id: 'INV-2024-003',
      patient: 'Swapna Reddy',
      date: '2024-11-05',
      amount: 1200.00,
      status: 'Overdue',
      service: 'Emergency Care'
    }
  ]);

  const [payments] = useState([
    {
      id: 'PAY-2024-001',
      patient: 'Vikranth Singh',
      date: '2024-11-01',
      amount: 550.00,
      method: 'Credit Card',
      reference: 'REF123456'
    },
    {
      id: 'PAY-2024-002',
      patient: 'Swapna Reddy',
      date: '2024-11-02',
      amount: 300.00,
      method: 'Insurance',
      reference: 'INS789012'
    }
  ]);

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const renderInvoices = () => (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Patient</th>
            <th>Service</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.patient}</td>
              <td>{invoice.service}</td>
              <td>{invoice.date}</td>
              <td>${invoice.amount.toFixed(2)}</td>
              <td>
                <span className={`${styles.status} ${styles[invoice.status.toLowerCase()]}`}>
                  {invoice.status}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionButton}>
                    <FileText size={16} />
                    View
                  </button>
                  <button className={styles.actionButton}>
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
  );

  const renderPayments = () => (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Reference</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.patient}</td>
              <td>{payment.date}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.method}</td>
              <td>{payment.reference}</td>
              <td>
                <button className={styles.actionButton}>
                  <FileText size={16} />
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
    <><Header />
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/Mainpage')}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Billing Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.summaryInfo}>
            <h3>Total Revenue</h3>
            <p>$2,500.00</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.summaryInfo}>
            <h3>Pending Payments</h3>
            <p>$750.00</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'invoices' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            Invoices
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'payments' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </div>

        <div className={styles.filters}>
          <select 
            value={dateFilter}
            onChange={handleDateFilterChange}
            className={styles.filterSelect}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className={styles.filterButton}>
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'invoices' ? renderInvoices() : renderPayments()}
    </div>
    <Footer/>
    </>
  );
};

export default BillingOverview;