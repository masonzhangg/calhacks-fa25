"use client";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/sign-in");
		}, 4000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				backgroundColor: "rgba(240, 240, 240, 0.9)",
				padding: "2rem",
			}}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: "400px",
					textAlign: "left",
				}}
			>
				<Typography
					variant="h4"
					sx={{
						marginBottom: "1rem",
						fontWeight: "regular",
						fontFamily: "Inter",
						fontSize: "1.5rem",
						width: "100%",
						color: "black",
					}}
				>
					You have successfully logged out.
				</Typography>
			</Box>
		</Box>
	);
};

export default Logout;
