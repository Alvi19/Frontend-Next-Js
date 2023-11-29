import Layout from "@/components/layout/layout";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { barangService } from "./../services/barang";
import { formatRp } from "./../utils/numberUtils";
import { useFormik } from "formik";
import { BarangType } from "@/types/barangType";

const Barang = () => {
  const [selectData, setSelectData] = React.useState<BarangType | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: barangService.getAll,
    queryKey: ["list-barang"],
  });

  const { mutate } = useMutation({
    mutationFn: barangService.post,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-barang"] });
      formik.resetForm();
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: barangService.put,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-barang"] });
      formik.resetForm();
      setSelectData(null);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: barangService.delete,
    onSuccess: () => {
      (document?.getElementById("my_modal_2") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-barang"] });
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      kodebrg: "",
      namabrg: "",
      satuan: "",
      hargabeli: "",
    },
    onSubmit: async () => {
      if (selectData) {
        editItem({
          id: selectData.id,
          body: formik.values,
        });
      } else {
        mutate(formik.values);
      }
    },
  });

  const openDialogForm = (data?: BarangType | null) => {
    if (data) {
      setSelectData(data);
      formik.setFieldValue("kodebrg", data.kodebrg);
      formik.setFieldValue("namabrg", data.namabrg);
      formik.setFieldValue("satuan", data.satuan);
      formik.setFieldValue("hargabeli", data.hargabeli);
    }
    (document?.getElementById("my_modal_1") as any).showModal();
  };

  return (
    <Layout>
      <div className="flex">
        <h1 className="mr-2">Data Barang</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => openDialogForm()}
        >
          Tambah Barang
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectData ? "Edit" : "Tambah"} Data Barang
            </h3>
            <div className="py-4">
              <form onSubmit={formik.handleSubmit} action="">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Kode Barang</span>
                  </label>
                  <input
                    type="text"
                    name="kodebrg"
                    onChange={formik.handleChange}
                    value={formik.values.kodebrg}
                    className="input input-bordered w-full"
                  />
                  <label className="label">
                    <span className="label-text">Nama Barang</span>
                  </label>
                  <input
                    type="text"
                    name="namabrg"
                    onChange={formik.handleChange}
                    value={formik.values.namabrg}
                    className="input input-bordered w-full"
                  />
                  <label className="label">
                    <span className="label-text">Satuan</span>
                  </label>
                  <input
                    type="text"
                    name="satuan"
                    onChange={formik.handleChange}
                    value={formik.values.satuan}
                    className="input input-bordered w-full"
                  />
                  <label className="label">
                    <span className="label-text">Harga Beli</span>
                  </label>
                  <input
                    type="text"
                    name="hargabeli"
                    onChange={formik.handleChange}
                    value={formik.values.hargabeli}
                    className="input input-bordered w-full"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-xl mt-3">
                  Simpan
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button
                  onClick={() => {
                    formik.resetForm();
                    setSelectData(null);
                  }}
                  className="btn btn-xl"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hapus Data Barang</h3>
            <div className="py-4">Apakah anda ingin menghapus data ini ?</div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-xl">Close</button>
              </form>
              <button
                onClick={() => selectData && deleteItem(selectData.id)}
                className="btn btn-error btn-xl"
              >
                Hapus
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <div className="justify-center items-center">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th>Harga Beli</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data.data ?? []).map((item, index) => (
                <tr key={index} className="bg-base-200">
                  <th>{item.id}</th>
                  <td>{item.kodebrg}</td>
                  <td>{item.namabrg}</td>
                  <td>{item.satuan}</td>
                  <td>{formatRp(item.hargabeli)}</td>
                  <td>
                    <button
                      onClick={() => openDialogForm(item)}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => {
                        (
                          document?.getElementById("my_modal_2") as any
                        ).showModal();
                        setSelectData(item);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Barang;
