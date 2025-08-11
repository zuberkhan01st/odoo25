"use client";
import React from 'react';

const CheckoutPage = () => {
	const handlePay = async () => {
		// 1. Create order on backend
		const res = await fetch('http://localhost:5000/api/bookings/create_payment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: 100, // Amount in INR (e.g., 100 = ₹100)
				currency: 'INR',
				receipt: 'checkout_receipt_4'
			})
		});
		const order = await res.json();

		// 2. Load Razorpay script if not already loaded
		if (!window.Razorpay) {
			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';

			script.async = true;
			document.body.appendChild(script);
			script.onload = () => openRazorpay(order);
		} else {
			openRazorpay(order);
		}
	};

	const openRazorpay = (order) => {
		const options = {
			key: 'rzp_live_FrDs3l7n92pZV5', // Replace with your public key
			amount: order.amount,
			currency: order.currency,
			name: 'Court Booking',
			description: 'Court Booking Payment',
			order_id: order._id,
			handler: function (response) {
				alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
				// Optionally, send response to backend for verification
			},
			prefill: {
				name: 'Test User',
				email: 'test@example.com',
				contact: '9999999999'
			},
			theme: { color: '#3399cc' }
		};
		const rzp = new window.Razorpay(options);
		rzp.open();
	};

	return (
		<div style={{ padding: 32 }}>
			<h1>Checkout Page</h1>
			<button
				style={{
					padding: '12px 24px',
					fontSize: 18,
					background: '#3399cc',
					color: '#fff',
					border: 'none',
					borderRadius: 4,
					cursor: 'pointer',
					marginTop: 24
				}}
				onClick={handlePay}
			>
				Pay
			</button>
		</div>
	);
};

export default CheckoutPage;
