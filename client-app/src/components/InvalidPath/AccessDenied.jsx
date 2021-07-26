import React from 'react'

export default function AccessDenied() {
	return (
		<div style={{ textAlign: "center", marginTop: "7vh" }}>
			<img width="450vw" height="auto"
				style={{ marginBottom: "5vh" }}
				src="/access-denied.jpg"
				alt="accessdenied" />
			<h2>You do not have access to this resource !</h2>
			<h3>Login and try again !</h3>
		</div >
	)
}
