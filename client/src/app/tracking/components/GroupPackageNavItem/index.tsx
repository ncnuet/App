import PackageNavItem from "../PackageNavItem";

export default function GroupPackageNavItem() {
    return (
        <>
            <div className="flex flex-col gap-5 h-full overflow-y-scroll px-4 py-4 list">
                <PackageNavItem selected />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
                <PackageNavItem />
            </div>
        </>
    )
}