import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica', // Standard font for compatibility
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#00d09c',
        paddingBottom: 20,
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    reportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        textTransform: 'uppercase',
    },
    reportDate: {
        fontSize: 10,
        color: '#64748b',
        marginTop: 4,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00d09c',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    card: {
        width: '48%', // Approx 2 columns
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    cardLabel: {
        fontSize: 10,
        color: '#64748b',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    cardSub: {
        fontSize: 10,
        marginTop: 5,
        color: '#00d09c', // Emerald for positive
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 20,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '33%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        backgroundColor: '#f1f5f9',
        padding: 8,
    },
    tableCol: {
        width: '33%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        padding: 8,
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#475569',
    },
    tableCell: {
        fontSize: 10,
        color: '#1e293b',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 8,
        color: '#94a3b8',
    },
});

// Mock Data for Report (Sync with Dashboard state in real app via props)
const metrics = [
    { label: 'Active Members', value: '1,284', sub: '+12.4% vs last month' },
    { label: 'Monthly Revenue', value: '$42,500', sub: '+$4.2k vs target' },
    { label: 'Retention Rate', value: '94.2%', sub: '-1.2% (Needs Attention)' },
    { label: 'New Sign-ups', value: '67', sub: '+18 this week' },
];

const revenueData = [
    { source: 'Memberships', amount: '$32,000', pct: '75%' },
    { source: 'Personal Training', amount: '$8,500', pct: '20%' },
    { source: 'Retail / Supplements', amount: '$2,000', pct: '5%' },
];

const DashboardReport = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>ELITE</Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}>Executive Summary Report</Text>
                    <Text style={styles.reportDate}>Generated: {format(new Date(), "MMM d, yyyy • h:mm a")}</Text>
                </View>
            </View>

            {/* Section 1: Key Metrics */}
            <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
            <View style={styles.grid}>
                {metrics.map((m, i) => (
                    <View key={i} style={styles.card}>
                        <Text style={styles.cardLabel}>{m.label}</Text>
                        <Text style={styles.cardValue}>{m.value}</Text>
                        <Text style={styles.cardSub}>{m.sub}</Text>
                    </View>
                ))}
            </View>

            {/* Section 2: Revenue Distribution */}
            <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Source</Text></View>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Amount</Text></View>
                    <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Percentage</Text></View>
                </View>
                {revenueData.map((row, i) => (
                    <View key={i} style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.source}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.amount}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.pct}</Text></View>
                    </View>
                ))}
            </View>

            {/* Section 3: Equipment & Notes */}
            <Text style={styles.sectionTitle}>Operational Status</Text>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, color: '#1e293b', lineHeight: 1.5 }}>
                    • Cardio Machines: 48/50 Active (96%){'\n'}
                    • Strength Equipment: 22/24 Active (91%){'\n'}
                    • Upcoming Maintenance: 2 scheduled for next week.{'\n'}
                    • Retention Risk: 12 members categorized as "At-Risk" (no visit &gt; 30 days).
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Confidential & Proprietary - Elite Gym Management Systems</Text>
                <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </View>
        </Page>
    </Document>
);

export default DashboardReport;
