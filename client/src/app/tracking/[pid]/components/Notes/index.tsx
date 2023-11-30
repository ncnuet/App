interface IProps {
    notes?: string
    loading: boolean
}

export default function Notes({ loading, notes }: IProps) {
    return (
        <section>
            <label className="text-sm block mb-2 font-semibold">Ghi chú của khách hàng</label>
            {loading
                ? <section className="bg-gray-100 animate-pulse h-24 rounded-xl w-full">

                </section>
                : <textarea
                    disabled defaultValue={notes}
                    rows={5}
                    className="bg-cgray-100 rounded-xl w-full" />
            }
        </section>)

}