import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get all champions
const getChampions = async (req, res) => {
  try {
    const champions = await prisma.champion.findMany()
    res.json(champions)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

// Get a single champion
const getChampion = async (req, res) => {
  const id = Number(req.params.id)
  try {
    const champion = await prisma.champion.findUnique({
      where: { id }
    })
    res.json(champion)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

// Create a champion
const createChampion = async (req, res) => {
  const { name, type } = req.body
  try {
    const champion = await prisma.champion.create({
      data: { name, type }
    })
    res.json(champion)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

// Update a champion
const updateChampion = async (req, res) => {
  const id = Number(req.params.id)
  const { name, type } = req.body
  try {
    const champion = await prisma.champion.update({
      where: { id },
      data: { name, type }
    })
    res.json(champion)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

// Delete a champion
const deleteChampion = async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.champion.delete({
      where: { id }
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export { getChampions, getChampion, createChampion, updateChampion, deleteChampion }
