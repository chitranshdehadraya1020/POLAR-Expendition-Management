from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Text
)

from database import Base


# =========================================================
# 1. LOCATIONS
# =========================================================

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)

    location_type = Column(String(50))

    latitude = Column(Float)

    longitude = Column(Float)

    description = Column(Text)


# =========================================================
# 2. EXPEDITIONS
# =========================================================

class Expedition(Base):
    __tablename__ = "expeditions"

    id = Column(Integer, primary_key=True, index=True)

    expedition_code = Column(
        String(50),
        unique=True,
        nullable=False
    )

    name = Column(String(200), nullable=False)

    objective = Column(Text)

    start_date = Column(DateTime)

    expected_end_date = Column(DateTime)

    actual_end_date = Column(DateTime)

    budget = Column(Float)

    status = Column(
        String(50),
        default="PLANNED"
    )

    origin_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    destination_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    manager = Column(String(150))


# =========================================================
# 3. EXPEDITION LOCATIONS
# =========================================================

class ExpeditionLocation(Base):
    __tablename__ = "expedition_locations"

    id = Column(Integer, primary_key=True)

    expedition_id = Column(
        Integer,
        ForeignKey("expeditions.id"),
        nullable=False
    )

    location_id = Column(
        Integer,
        ForeignKey("locations.id"),
        nullable=False
    )

    sequence_number = Column(Integer)

    planned_arrival = Column(DateTime)

    actual_arrival = Column(DateTime)

    departure_time = Column(DateTime)

    status = Column(String(50))


# =========================================================
# 4. CARGO
# =========================================================

class Cargo(Base):
    __tablename__ = "cargo"

    id = Column(Integer, primary_key=True)

    cargo_code = Column(
        String(50),
        unique=True,
        nullable=False
    )

    description = Column(Text)

    category = Column(String(100))

    quantity = Column(Float)

    unit = Column(String(30))

    weight_kg = Column(Float)

    sender = Column(String(150))

    receiver = Column(String(150))

    expedition_id = Column(
        Integer,
        ForeignKey("expeditions.id")
    )

    current_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    shipment_status = Column(
        String(50),
        default="REGISTERED"
    )

    expected_arrival = Column(DateTime)

    actual_arrival = Column(DateTime)

    delay_reason = Column(Text)


# =========================================================
# 5. CARGO MOVEMENTS
# =========================================================

class CargoMovement(Base):
    __tablename__ = "cargo_movements"

    id = Column(Integer, primary_key=True)

    cargo_id = Column(
        Integer,
        ForeignKey("cargo.id"),
        nullable=False
    )

    from_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    to_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    movement_time = Column(DateTime)

    status = Column(String(50))

    remarks = Column(Text)


# =========================================================
# 6. SUPPLIERS
# =========================================================

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True)

    supplier_code = Column(
        String(50),
        unique=True
    )

    name = Column(
        String(200),
        nullable=False
    )

    contact_person = Column(String(150))

    phone = Column(String(30))

    email = Column(String(150))

    address = Column(Text)

    status = Column(
        String(50),
        default="ACTIVE"
    )


# =========================================================
# 7. INVENTORY ITEMS
# =========================================================

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True)

    item_code = Column(
        String(50),
        unique=True,
        nullable=False
    )

    name = Column(
        String(200),
        nullable=False
    )

    category = Column(String(100))

    description = Column(Text)

    quantity = Column(
        Float,
        default=0
    )

    unit = Column(String(30))

    minimum_stock = Column(
        Float,
        default=0
    )

    quality_status = Column(String(50))

    storage_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    supplier_id = Column(
        Integer,
        ForeignKey("suppliers.id")
    )

    received_cargo_id = Column(
        Integer,
        ForeignKey("cargo.id")
    )

    status = Column(
        String(50),
        default="AVAILABLE"
    )


# =========================================================
# 8. INVENTORY TRANSACTIONS
# =========================================================

class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id = Column(Integer, primary_key=True)

    item_id = Column(
        Integer,
        ForeignKey("inventory_items.id"),
        nullable=False
    )

    transaction_type = Column(String(30))

    quantity = Column(Float)

    transaction_time = Column(DateTime)

    location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    cargo_id = Column(
        Integer,
        ForeignKey("cargo.id")
    )

    remarks = Column(Text)


# =========================================================
# 9. PERSONNEL
# =========================================================

class Personnel(Base):
    __tablename__ = "personnel"

    id = Column(Integer, primary_key=True)

    personnel_code = Column(
        String(50),
        unique=True,
        nullable=False
    )

    name = Column(
        String(150),
        nullable=False
    )

    role = Column(String(100))

    department = Column(String(100))

    contact = Column(String(50))

    current_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    availability_status = Column(
        String(50),
        default="AVAILABLE"
    )

    personnel_status = Column(
        String(50),
        default="ACTIVE"
    )


# =========================================================
# 10. PERSONNEL ASSIGNMENTS
# =========================================================

class PersonnelAssignment(Base):
    __tablename__ = "personnel_assignments"

    id = Column(Integer, primary_key=True)

    personnel_id = Column(
        Integer,
        ForeignKey("personnel.id"),
        nullable=False
    )

    expedition_id = Column(
        Integer,
        ForeignKey("expeditions.id"),
        nullable=False
    )

    role = Column(String(100))

    assignment_start = Column(DateTime)

    assignment_end = Column(DateTime)

    status = Column(String(50))


# =========================================================
# 11. PERSONNEL MOVEMENTS
# =========================================================

class PersonnelMovement(Base):
    __tablename__ = "personnel_movements"

    id = Column(Integer, primary_key=True)

    personnel_id = Column(
        Integer,
        ForeignKey("personnel.id"),
        nullable=False
    )

    from_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    to_location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    movement_time = Column(DateTime)

    movement_status = Column(String(50))

    remarks = Column(Text)


# =========================================================
# 12. RESOURCES
# =========================================================

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True)

    resource_code = Column(
        String(50),
        unique=True
    )

    name = Column(String(150))

    resource_type = Column(String(100))

    quantity = Column(
        Float,
        default=0
    )

    location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    status = Column(
        String(50),
        default="AVAILABLE"
    )


# =========================================================
# 13. EMERGENCIES
# =========================================================

class Emergency(Base):
    __tablename__ = "emergencies"

    id = Column(Integer, primary_key=True)

    emergency_code = Column(
        String(50),
        unique=True,
        nullable=False
    )

    emergency_type = Column(String(100))

    severity = Column(String(30))

    location_id = Column(
        Integer,
        ForeignKey("locations.id")
    )

    reported_by = Column(
        Integer,
        ForeignKey("personnel.id")
    )

    reported_time = Column(DateTime)

    description = Column(Text)

    status = Column(
        String(50),
        default="REPORTED"
    )

    resolved_time = Column(DateTime)


# =========================================================
# 14. EMERGENCY RESOURCES
# =========================================================

class EmergencyResource(Base):
    __tablename__ = "emergency_resources"

    id = Column(Integer, primary_key=True)

    emergency_id = Column(
        Integer,
        ForeignKey("emergencies.id"),
        nullable=False
    )

    resource_id = Column(
        Integer,
        ForeignKey("resources.id"),
        nullable=False
    )

    quantity_used = Column(
        Float,
        default=1
    )

    assigned_time = Column(DateTime)

    released_time = Column(DateTime)

    status = Column(String(50))


# =========================================================
# 15. EMERGENCY UPDATES
# =========================================================

class EmergencyUpdate(Base):
    __tablename__ = "emergency_updates"

    id = Column(Integer, primary_key=True)

    emergency_id = Column(
        Integer,
        ForeignKey("emergencies.id"),
        nullable=False
    )

    updated_by = Column(
        Integer,
        ForeignKey("personnel.id")
    )

    update_time = Column(DateTime)

    status = Column(String(50))

    update_message = Column(Text)