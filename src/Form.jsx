import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function Form() {
    const [info, setInfo] = useState({
        name: '',
        city: '',
        salary: '',
        mobile: '',
    });
    const [allData, setAllData] = useState([]);
    const [edit, setEdit] = useState({
        id: '',
        name: '',
        city: '',
        salary: '',
        mobile: '',
    });

    const ref = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target
        setInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(info)

        try {
            const url = await axios.post('http://localhost:3000/details', info)
            console.log(url.data)
            setInfo({ name: '', city: '', salary: '', mobile: '' })
        } catch (error) {
            console.log(error)
        }
        getAll()
    }

    const getAll = async () => {
        try {
            const url = await axios.get('http://localhost:3000/details')
            setAllData(url.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAll()
    }, []);

    const handleDelete = async (id) => {
        try {
            const url = await axios.delete(`http://localhost:3000/details/${id}`)
            setAllData(prev =>
                prev.filter(i => i.id != id)
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (foo) => {
        ref.current.click()
        setEdit({ id: foo.id, name: foo.name, city: foo.city, salary: foo.salary, mobile: foo.mobile, })
    }

    const changeEdit = (e) => {
        const { name, value } = e.target
        setEdit((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const editData = async () => {
        const { id, ...remain } = edit
        try {
            const res = await axios.put(`http://localhost:3000/details/${id}`, remain)
            console.log(res.data)
            getAll()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='w-50 m-auto mt-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                        <input type="text" name='name' onChange={handleChange} value={info.name} className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Name" />
                    </div>
                    <div className=" mb-3">
                        <label className='form-label' htmlFor="city">City</label>
                        <select className="form-control" name="city" id="city" value={info.city} onChange={handleChange}>
                            <option value="Rajkot">Rajkot</option>
                            <option value="Ahemdabad">Ahemdabad</option>
                            <option value="Surat">Surat</option>
                            <option value="Vadodara">Vadodara</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea2" className="form-label">Salary</label>
                        <input type="number" name='salary' onChange={handleChange} value={info.salary} className="form-control" id="exampleFormControlInput2" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea3" className="form-label">Mobile</label>
                        <input type="number" name='mobile' onChange={handleChange} value={info.mobile} className="form-control" id="exampleFormControlInput3" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div className='w-75 m-auto'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">City</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((item, index) => {
                            return (<tr key={index}>
                                <td scope="row">{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.salary}</td>
                                <td>{item.mobile}</td>
                                <td>
                                    <button type="button" className="btn btn-warning m-3 " onClick={() => { handleUpdate(item) }}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => { handleDelete(item.id) }}>Delete</button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>


            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                                <input type="text" name='name' onChange={changeEdit} value={edit.name} className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Name" />
                            </div>
                            <div className=" mb-3">
                                <label className='form-label' htmlFor="city">City</label>
                                <select className="form-control" name="city" id="city" value={edit.city} onChange={changeEdit}>
                                    <option value="Rajkot">Rajkot</option>
                                    <option value="Ahemdabad">Ahemdabad</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Vadodara">Vadodara</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea2" className="form-label">Salary</label>
                                <input type="number" name='salary' onChange={changeEdit} value={edit.salary} className="form-control" id="exampleFormControlInput2" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea3" className="form-label">Mobile</label>
                                <input type="number" name='mobile' onChange={changeEdit} value={edit.mobile} className="form-control" id="exampleFormControlInput3" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={editData}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form