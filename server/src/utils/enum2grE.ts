export default function toGraphEnum(obj: object) {
    return Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, { value: v }]
        )
    )
}