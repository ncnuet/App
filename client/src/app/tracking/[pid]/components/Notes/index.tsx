interface IProps {
    notes?: string
    loading: boolean
}

export default function Notes({ loading, notes }: IProps) {
    return loading
        ? <section>
            <div className="h-4 w-2/6 rounded-md bg-gray-200 mb-2"></div>
            <textarea
                className="bg-gray-100 animate-pulse h-24 rounded-xl w-full border-none">
            </textarea>
        </section>
        : <section>
            <label className="text-sm block mb-2 font-semibold">Ghi chú của khách hàng</label>
            <textarea
                disabled defaultValue={notes}
                rows={5}
                className="bg-cgray-100 rounded-xl w-full border-none" />
        </section>

}