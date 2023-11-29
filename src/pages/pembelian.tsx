import Layout from "@/components/layout/layout";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pembelianService } from "./../services/pembelian";
import { formatRp } from "./../utils/numberUtils";
import { useFormik } from "formik";
import { suplierService } from "./../services/suplier";
import { barangService } from "./../services/barang";
import { PembelianType } from "@/types/pembelian";

const Pembelian = () => {
  const [selectData, setSelectData] = React.useState<PembelianType | null>(
    null
  );

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: pembelianService.getAll,
    queryKey: ["list-pembelian"],
  });

  const { data: Kodesuplier } = useQuery({
    queryFn: suplierService.getAll,
    queryKey: ["list-suplier"],
  });

  const { data: barang } = useQuery({
    queryFn: barangService.getAll,
    queryKey: ["list-barang"],
  });

  const { mutate } = useMutation({
    mutationFn: pembelianService.post,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-pembelian"] });
      formik.resetForm();
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: pembelianService.put,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-pembelian"] });
      formik.resetForm();
      setSelectData(null);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: pembelianService.delete,
    onSuccess: () => {
      (document?.getElementById("my_modal_2") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-pembelian"] });
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      kodespl: "",
      tglbeli: "",
      kodebrg: "",
      hargabeli: "",
      qty: "",
      diskon: "",
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

  const openDialogForm = (data?: PembelianType | null) => {
    if (data) {
      setSelectData(data);
      // formik.setFieldValue("kodespl", data.kodespl);
      formik.setFieldValue("tglbeli", data.tglbeli);
      formik.setFieldValue("kodebrg", data.kodebrg);
      formik.setFieldValue("hargabeli", data.hargabeli);
      formik.setFieldValue("qty", data.qty);
      formik.setFieldValue("diskon", data.diskon);
      // formik.setFieldValue("totalhutang", data.totalhutang);
    }
    (document?.getElementById("my_modal_1") as any).showModal();
  };

  return (
    <Layout>
      <div className="flex">
        <h1 className="mr-2">Data Pembelian</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            (document?.getElementById("my_modal_1") as any).showModal()
          }
        >
          Tambah Pembelian
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => openDialogForm()}
          >
            Tambah Pembelian
          </button>
          <div className="py-4">
            <form onSubmit={formik.handleSubmit} action="">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Kode Suplier</span>
                </label>
                <select
                  name="kodespl"
                  onChange={formik.handleChange}
                  value={formik.values.kodespl}
                  className="select select-bordered w-full"
                >
                  <option value=""></option>
                  {(Kodesuplier?.data.data ?? []).map((item, index) => (
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
              </div>
              <label className="label">
                <span className="label-text">Kode Barang</span>
              </label>
              <select
                name="kodebrg"
                onChange={formik.handleChange}
                value={formik.values.kodebrg}
                className="select select-bordered w-full"
              >
                <option value=""></option>
                {(barang?.data.data ?? []).map((item, index) => (
                  <option key={index} value={item.kodebrg}>
                    {item.kodebrg}
                  </option>
                ))}
              </select>
              <label className="label">
                <span className="label-text">Harga Beli</span>
              </label>
              <input
                type="number"
                name="hargabeli"
                onChange={formik.handleChange}
                value={formik.values.hargabeli}
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">QTY</span>
              </label>
              <input
                type="number"
                name="qty"
                onChange={formik.handleChange}
                value={formik.values.qty}
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text">Diskon</span>
              </label>
              <input
                type="number"
                name="diskon"
                onChange={formik.handleChange}
                value={formik.values.diskon}
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
              <button type="submit" className="btn btn-primary btn-xl mt-3">
                Simpan
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-xl">Close</button>
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
                <th>Kode Barang</th>
                <th>Harga Beli</th>
                <th>QTY</th>
                <th>Diskon</th>
                <th>Diskon RP</th>
                <th>Total RP</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data.data ?? []).map((item, index) => (
                <tr key={index} className="bg-base-200">
                  <th>{item.id}</th>
                  <td>{item.notransaksi}</td>
                  <td>{item.kodebrg}</td>
                  <td>{formatRp(item.hargabeli)}</td>
                  <td>{item.qty}</td>
                  <td>{item.diskon}</td>
                  <td>{formatRp(item.diskonrp)}</td>
                  <td>{formatRp(item.totalrp)}</td>
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

export default Pembelian;
