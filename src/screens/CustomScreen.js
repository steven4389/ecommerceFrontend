import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import InputColor from 'react-input-color';
import {getCustom, changeCustom} from '../actions/customActions';
import {useForm} from '../Hooks/useForm';
import axios from 'axios';

export const CustomScreen = () => {
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustom());

        return () => {
            //
        };
    }, []);

    const {custom, loading, error} = useSelector((state) => state.getCustom);
    const {_id, colorTheme, storeName, logotipo, width, height} = !!custom.length > 0 && custom[0];
    const [formValues, handleInputChange] = useForm({
        id: _id,
        _storeName: storeName,
        _logotipo: logotipo,
        _width: width,
        _height:height
    });

    const {id, _storeName, _logotipo, _width, _height} = formValues;
    const [color, setColor] = useState({});

    const submitHandler = async (e) => {
        e.preventDefault();
        const customUpdated = {id: _id, colorTheme: color.hex, storeName: _storeName, logotipo: _logotipo, width: _width, height:_height}
        await dispatch(changeCustom(customUpdated));
        dispatch(getCustom());
    };

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        console.log("file", file)
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
            .post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log("response.data", response.data);
                const e = {target: {name: "_logotipo", value: response.data}}
                handleInputChange(e);
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    return (
        <>
            <div className="container custom">
                <div className="title">
                    <h1>Configuración</h1>
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : colorTheme !== undefined && id !== undefined ?
                            (
                                <div className="formulario">
                                    <form onSubmit={submitHandler}>
                                        <div className="formGroup">
                                            <label id="colorThemeLabel" htmlFor="logotipo">Color de tema</label>
                                            <div id="colorTheme">
                                                <InputColor
                                                    initialValue={colorTheme}
                                                    onChange={setColor}
                                                    placement="right"
                                                />
                                            </div>

                                        </div>
                                        <div className="formGroup">
                                            <label htmlFor="name">
                                                Nombre de la tienda
                                        </label>
                                            <input value={_storeName}
                                                type="_storeName"
                                                name="_storeName"
                                                id="_storeName"
                                                onChange={handleInputChange}>
                                            </input>
                                        </div>
                                        <div className="formGroup">
                                            <label htmlFor="logotipo">Logotipo</label>
                                            <input
                                                value={_logotipo}
                                                type="_logotipo"
                                                name="_logotipo"
                                                id="_logotipo"
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                        <div className="formGroup">
                                            <input type="file" onChange={uploadFileHandler} ></input>
                                            {uploading && <div>Uploading...</div>}
                                        </div>
                                        <div className="formGroup">
                                            <label htmlFor="name">
                                                Ancho del logotipo
                                        </label>
                                            <input value={_width}
                                                type="_width"
                                                name="_width"
                                                id="_width"
                                                onChange={handleInputChange}>
                                            </input>
                                        </div>
                                        <div className="formGroup">
                                            <label htmlFor="name">
                                                Altura del logotipo
                                        </label>
                                            <input value={_height}
                                                type="_height"
                                                name="_height"
                                                id="_height"
                                                onChange={handleInputChange}>
                                            </input>
                                        </div>
                                        <div className="formGroup">
                                            <button type="submit" className="button primary">
                                                Update
                                        </button>
                                        </div>
                                    </form>
                                </div>
                            ) :
                            <div>Loading...</div>}
            </div>
        </>
    )
}
