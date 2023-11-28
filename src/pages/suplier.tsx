import Layout from "@/components/layout/layout";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suplierService } from "./../services/suplier";
import { useFormik } from "formik";
import { SuplierType } from "@/types/suplier";

const Suplier = () => {
  const [selectData, setSelectData] = React.useState<SuplierType | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: suplierService.getAll,
    queryKey: ["list-suplier"],
  });

  const { mutate } = useMutation({
    mutationFn: suplierService.post,
    onSuccess: () => {
      (document?.getElementById("my_modal_1") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-suplier"] });
      formik.resetForm();
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: suplierService.delete,
    onSuccess: () => {
      (document?.getElementById("my_modal_2") as any).close();
      queryClient.invalidateQueries({ queryKey: ["list-suplier"] });
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      kodespl: "",
      namaspl: "",
    },
    onSubmit: async () => {
      mutate(formik.values);
    },
  });

  return (
    <Layout>
      <div className="flex">
        <h1 className="mr-2">Data Suplier</h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            (document?.getElementById("my_modal_1") as any).showModal()
          }
        >
          Tambah Suplier
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Data Suplier</h3>
          <div className="py-4">
            <form onSubmit={formik.handleSubmit} action="">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Kode Suplier</span>
                </label>
                <input
                  type="text"
                  name="kodespl"
                  onChange={formik.handleChange}
                  value={formik.values.kodespl}
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text">Nama Suplier</span>
                </label>
                <input
                  type="text"
                  name="namaspl"
                  onChange={formik.handleChange}
                  value={formik.values.namaspl}
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
                <th>Kode Suplier</th>
                <th>Nama Suplier</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data.data ?? []).map((item, index) => (
                <tr key={index} className="bg-base-200">
                  <th>{item.id}</th>
                  <td>{item.kodespl}</td>
                  <td>{item.namaspl}</td>
                  <td>
                    <button className="btn btn-primary btn-sm mr-2">
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

export default Suplier;
