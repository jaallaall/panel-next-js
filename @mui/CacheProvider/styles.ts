export const fontFamily = `
	@font-face {
		font-family: "IRANSans";
		src: url("/fonts/IRANSans/IRANSansWeb(FaNum).eot");
		src: url("/fonts/IRANSans/IRANSansWeb(FaNum).eot?#iefix")
			format("embedded-opentype"),
			url("/fonts/IRANSans/IRANSansWeb(FaNum).woff") format("woff"),
			url("/fonts/IRANSans/IRANSansWeb(FaNum).woff2") format("woff2"),
			url("/fonts/IRANSans/IRANSansWeb(FaNum).ttf") format("truetype");
		font-style: normal;
		font-weight: normal;
	},
	@font-face {
		font-family: "IRANSans";
		src: url("/fonts/IRANSans/IRANSansWeb(FaNum)_Bold.eot");
		src: url("/fonts/IRANSans/IRANSansWeb(FaNum)_Bold.eot?#iefix")
			format("embedded-opentype"),
			url("/fonts/IRANSans/IRANSansWeb(FaNum)_Bold.woff") format("woff"),
			url("/fonts/IRANSans/IRANSansWeb(FaNum)_Bold.woff2") format("woff2"),
			url("/fonts/IRANSans/IRANSansWeb(FaNum)_Bold.ttf")
			format("truetype");
		font-style: normal;
		font-weight: bold;
	}
`;

export const defaultStyles = `
	body,#root,#__next{
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		text-align:left;
		
	}
	.ReactQueryDevtools{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99999;
	}
	@keyframes spinners-react-circular-fixed {
		0% {
			stroke-dashoffset: 325;
		}
		100% {
			stroke-dashoffset: 151;
		}
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type=number] {
		-moz-appearance: textfield;
	}
	a {
		text-decoration:none;
		color:inherit
	}
`;

export const styleRtl = `
	.muirtl-k008qs{
		direction:ltr;
	}
	// .muirtl-k008qs .MuiIconButton-root{
	// 	transform:rotate(-180deg)
	// }
	.PrivatePickersFadeTransitionGroup-root .MuiButtonBase-root{
		color:#9B9B9B
	}
	.muirtl-78trlr-MuiButtonBase-root-MuiIconButton-root {
        left: auto !important;
        right: 4px
    }
	[class^=MUIDataTableFilterList-root]{
		justify-content: flex-start !important;
	}
	[class^=MUIDataTableToolbar-actions] {
        display: flex;
        justify-content: flex-end
    }
	.MuiTypography-root.MuiTypography-caption {
		text-align: left;
		margin-right: 35px;
		margin-left: 0;
	}
	.MuiTypography-root.MuiTypography-caption{
		font-size:inherit;
		margin-right:0
	}
	.PrivatePickersSlideTransition-root .MuiButtonBase-root{
		font-size:inherit
	}
`;
