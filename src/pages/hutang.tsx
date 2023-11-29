import Layout from "@/components/layout/layout";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { hutangService } from "./../services/hutang";
import { formatRp } from "./../utils/numberUtils";
import { useFormik } from "formik";
import { pembelianService } from "./../services/pembelian";
import { barangService } from "./../services/barang";
import { suplierService } from "./../services/suplier";
import { HutangType } from "@/types/hutang";

const Barang = () => {
  const [selectData, setSelectData] = React.useState<HutangType | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: hutangService.getAll,
    queryKey: ["list-hutang"],
  });

  const { data: transaksi } = useQuery({
    queryFn: pembelianService.getAll,
    queryKey: ["list-transaksi"],
  });

  const { data: suplier } = useQuery({
    queryFn: suplierService.getAll,
    queryKey: ["list-suplier"],
  });

  const { mutate } = useMutation({
    mutationFn: hutangService.post,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-hutang"] });
      formik.resetForm();
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: hutangService.put,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-hutang"] });
      formik.resetForm();
      setSelectData(null);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: hutangService.delete,
    onSuccess: () => {
      (document?.getElementById("my_modal_2") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-hutang"] });
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      notransaksi: "",
      kodespl: "",
      tglbeli: "",
      totalhutang: "",
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

  const openDialogForm = (data?: HutangType | null) => {
    if (data) {
      setSelectData(data);
      formik.setFieldValue("notransaksi", data.notransaksi);
      formik.setFieldValue("kodespl", data.kodespl);
      formik.setFieldValue("tglbeli", data.tglbeli);
      formik.setFieldValue("totalhutang", data.totalhutang);
    }
    (document?.getElementById("my_modal_1") as any).showModal();
  };

  return (
    <Layout>
      <div className="flex">
        <h1 className="mr-2">Data Hutang</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            (document?.getElementById("my_modal_1") as any).showModal()
          }
        >
          Tambah Hutang
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {selectData ? "Edit" : "Tambah"} Data Hutang
          </h3>
          <div className="py-4">
            <form onSubmit={formik.handleSubmit} action="">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">No Transaksi</span>
                </label>
                <select
                  name="notransaksi"
                  onChange={formik.handleChange}
                  value={formik.values.notransaksi}
                  className="select select-bordered w-full"
                >
                  {(transaksi?.data.data ?? []).map((item, index) => (
                    <option key={index} value={item.notransaksi}>
                      {item.notransaksi}
                    </option>
                  ))}
                </select>
                <label className="label">
                  <span className="label-text">Kode Suplier</span>
                </label>
                <select
                  name="kodespl"
                  onChange={formik.handleChange}
                  value={formik.values.kodespl}
                  className="select select-bordered w-full"
                >
                  {(suplier?.data.data ?? []).map((item, index) => (
                    <option key={index} value={item.kodespl}>
                      {item.kodespl}
                    </option>
                  ))}
                </select>
                <label className="label">
                  <span className="label-text">Tanggal Beli</span>
                </label>
                <input
                  type="date"
                  name="tglbeli"
                  onChange={formik.handleChange}
                  value={formik.values.tglbeli}
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Total Hutang</span>
                </label>
                <input
                  type="number"
                  name="totalhutang"
                  onChange={formik.handleChange}
                  value={formik.values.totalhutang}
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
          <h3 className="font-bold text-lg">Tambah Data Barang</h3>
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

      <div className="justify-center items-center">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>No Transaksi</th>
                <th>Kode Suplier</th>
                <th>Tanggal Beli</th>
                <th>Total Hutang</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data.data ?? []).map((item, index) => (
                <tr key={index} className="bg-base-200">
                  <th>{item.id}</th>
                  <td>{item.notransaksi}</td>
                  <td>{item.kodespl}</td>
                  <td>{item.tglbeli}</td>
                  <td>{formatRp(item.totalhutang)}</td>
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
