import React, { useEffect } from 'react'
import { CssTextField as TextField } from '../FormElements/TextfieldForm'
import { sendRequest } from '../../utils/Helpers/HelpersMethod'


function CustomerDataDisplay({ data, setView, setCustomerData, view, errors }) {

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCustomerData({ ...data, [name]: value });
	}

	// const handleClick = (e) => {
	// 	e.preventDefault();
	// 	console.log(data)
	// 	const validationErrors = ValidateCustomer(data);
	// 	const isValid = Object.keys(validationErrors).length === 0;
	// 	console.log(validationErrors, isValid);
	// 	setErrors(validationErrors);
	// 	if (isValid) {
	// 		console.log(data);
	// 		sendRequest('/customer/create', "POST", data)
	// 			.then((res) => {
	// 				if (res.success) {
	// 					toast.success(res.message, {
	// 						position: "top-right",
	// 						autoClose: 2000,
	// 						hideProgressBar: false,
	// 						closeOnClick: true,
	// 						pauseOnHover: true,
	// 						draggable: true,
	// 					});
	// 					setView(true)
	// 				} else {
	// 					toast.error(res.message, {
	// 						position: "top-right",
	// 						autoClose: 2000,
	// 						hideProgressBar: false,
	// 						closeOnClick: true,
	// 						pauseOnHover: true,
	// 						draggable: true,
	// 					});
	// 				}
	// 			})
	// 	} else {
	// 		console.log(errors);
	// 		toast.error("Enter Customer Details Properly");
	// 	}
	// }

	// const handleReset = () => {
	// 	setCustomerData(resetData);
	// 	setErrors({})
	// }

	useEffect(() => {
		if (data.c_id === 0) {
			sendRequest("/customer/getid", "POST")
				.then((res) => {
					if (res.success) {
						setCustomerData({ c_id: res.message });
					}
				})
		}
	}, [data.c_id, setCustomerData])

	// console.log(data)

	return (
		<div className='pt1'>
			<fieldset className='b--dashed b--black bw2'>
				<legend className='ph2 pr2 b'>Customer Details</legend>
				{
					view ?
						<>
							<pre>{`Customer Id\t: ${data.c_id === undefined ? "" : data.c_id}`}</pre>
							<pre>{`Name\t\t: ${data.name === undefined ? "" : data.name}`}</pre>
							<pre>{`Mobile\t\t: ${data.phone === undefined ? "" : data.phone}\t\tMobile 2: ${data.phone2 === undefined ? "" : data.phone2}`}</pre>
							<pre>{`Address\t\t: ${data.address === undefined ? "" : data.address}`}</pre>
						</>
						:
						<div>
							<div className='flex justify-start items-center'>
								<pre className='pr2 black'>Name       </pre>
								<TextField
									variant='outlined'
									autoFocus
									name='name'
									value={data.name ?? ""}
									onChange={handleChange}
									error={Boolean(errors.customer.name)}
									helperText={errors.customer.name}
									className='w-100'
								/>
								<pre className='pr2 black'>{`\tCustomer Id:  #${data.c_id}`}</pre>
							</div>
							<div className='flex justify-start items-center'>
								<pre className='pr2 black'>Address    </pre>
								<TextField
									variant='outlined'
									name='address'
									value={data.address ?? ""}
									onChange={handleChange}
									error={Boolean(errors.customer.address)}
									helperText={errors.customer.address}
									className='w-100'
								/>
							</div>
							<div className='flex justify-start items-center'>
								<pre className='pr2 black'>Contact 1 </pre>
								<TextField
									variant='outlined'
									name='phone'
									inputProps={{ maxLength: 10 }}
									value={data.phone ?? ""}
									onChange={handleChange}
									className='w-100'
								/>
								{/* <Done
									className='button-border b--black link pointer tc ma2 bg-green black ba bw1 dim dib w2 pa1 br2 b'
									fontSize="small"
									onClick={handleClick}
								/>
								<Reset
									className='button-border b--black link pointer tc ma2 bg-white black ba bw1 dim dib w2 pa1 br2 b'
									fontSize="small"
									onClick={handleReset}
								/> */}
							</div>
						</div>
				}

			</fieldset>
		</div>
	)
}

export default CustomerDataDisplay